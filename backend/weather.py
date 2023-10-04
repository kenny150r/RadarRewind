#!/usr/bin/env python3

import pyart
import boto3
from datetime import datetime, timedelta
import pytz
import numpy
from botocore import UNSIGNED
from botocore.client import Config
import numpy as np
import logging
from io import BytesIO
import matplotlib.pyplot as plt
import cartopy.crs as ccrs
import cartopy.io.img_tiles as cimgt
import matplotlib.colors


def radar_colormap():
    nws_reflectivity_colors = [
        "#646464",  # ND
        "#ccffff",  # -30
        "#cc99cc",  # -25
        "#996699",  # -20
        "#663366",  # -15
        "#cccc99",  # -10
        "#999966",  # -5
        "#646464",  # 0
        "#04e9e7",  # 5
        "#019ff4",  # 10
        "#0300f4",  # 15
        "#02fd02",  # 20
        "#01c501",  # 25
        "#008e00",  # 30
        "#fdf802",  # 35
        "#e5bc00",  # 40
        "#fd9500",  # 45
        "#fd0000",  # 50
        "#d40000",  # 55
        "#bc0000",  # 60
        "#f800fd",  # 65
        "#9854c6",  # 70
        "#fdfdfd"  # 75
    ]
    norm = matplotlib.colors.Normalize(vmin=-35, vmax=80)

    return matplotlib.colors.ListedColormap(nws_reflectivity_colors), norm

# %%


logging.getLogger().setLevel(logging.INFO)

radar_start_time = datetime(2023, 1, 11, 3, 0, 0, tzinfo=pytz.utc)
desired_sta = "KMUX"
timespan = 1  # hour
desired_lat_lon = [37.56827336413167, -122.28170615475135]

s3_client = boto3.client('s3', config=Config(signature_version=UNSIGNED))
prefix_str = radar_start_time.strftime(f'%Y/%m/%d/{desired_sta}/')
keys = s3_client.list_objects_v2(
    Bucket="noaa-nexrad-level2", Prefix=prefix_str)['Contents']
dts = np.array([datetime.strptime(f['Key'].split(
    '/')[-1], f"{desired_sta}%Y%m%d_%H%M%S_V06").replace(tzinfo=pytz.utc) for f in keys if '_MDM' not in f['Key']])
ix = np.argsort(dts)
dts = dts[ix]
keys = np.array(keys)[ix]
start_ix = min(np.searchsorted(dts, radar_start_time), len(dts)-1)
end_ix = min(np.searchsorted(dts, radar_start_time +
             timedelta(hours=timespan)), len(dts)-1)

logging.info(f"Processing radar for indices {start_ix} through {end_ix}")

# %%
for i in range(start_ix, end_ix+1):
    logging.info(f"Reading {keys[i]['Key']}")
    response = s3_client.get_object(
        Bucket="noaa-nexrad-level2", Key=keys[i]['Key'])
    file_content = response['Body'].read()

    # Wrap the content in a file-like BytesIO object
    file_obj = BytesIO(file_content)

    radar = pyart.io.read(file_obj)
    # %%
    cmap, norm = radar_colormap()
    a = radar.get_gate_lat_lon_alt(0)
    lat = a[0]
    lon = a[1]
    refl = radar.get_field(0, 'reflectivity')
    stamen_terrain = cimgt.Stamen('terrain')
    fig, ax = plt.subplots(figsize=(10, 7), subplot_kw={
                           'projection': stamen_terrain.crs})
    ax.set_extent([np.min(lon), np.max(lon), np.min(
        lat), np.max(lat)], crs=ccrs.Geodetic())
    pc = ax.pcolormesh(lon, lat, refl, transform=ccrs.PlateCarree(), cmap=cmap, norm=norm)
    cbar = fig.colorbar(pc, ax=ax, orientation='vertical', shrink=0.5)
    cbar.set_label('Reflectivity')
    ax.add_image(stamen_terrain, 6)

    # %%



    # Create a figure and axis
    fig, ax = plt.subplots( subplot_kw={
                           'projection': stamen_terrain.crs})
    
    # Plot the data using pcolormesh
    ix1 = np.logical_and(lon < desired_lat_lon[1]-0.25, lon > desired_lat_lon[1]+0.25)
    ix2 = np.logical_and(lat < desired_lat_lon[0]-0.25, lat > desired_lat_lon[0]+0.25)
    ix = np.logical_and(ix1,ix2)
    d = refl.data
    d[ix] = np.nan
    pc = ax.pcolormesh(lon[ix], lat[ix], refl.data[ix], transform=ccrs.PlateCarree(), cmap=cmap, norm=norm)
    ax.set_extent([desired_lat_lon[1]-0.25, desired_lat_lon[1]+0.25, desired_lat_lon[0]-0.25, desired_lat_lon[0]+0.25], crs=ccrs.Geodetic())
    # Turn off the axes
    ax.axis('off')
    
    # Save the output as SVG
    fig.savefig('/home/kenny/pcolormesh_data.svg', format='svg', bbox_inches='tight', pad_inches=0)
    plt.close(fig)
#%%
    asdf
