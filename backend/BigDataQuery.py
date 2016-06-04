import urllib.request
import json

def bg_query(database, city):

    qstr = 'http://egis.hud.opendata.arcgis.com/datasets/a4d78dc882bb456da6200b574bfb9e12_0.geojson?where=&geometry={"xmin":-11037250.36774588,"ymin":3492097.3789263135,"xmax":-10724164.299889948,"ymax":3583821.8128684806,"spatialReference":{"wkid":102100}}'

    response = urllib.request.urlopen(qstr)
    data = response.read()
    # second read acts as wait for 1st read to finish
    data2 = response.read()
    data_str = data.decode('utf-8')
    jdata = json.loads(data_str)
    return jdata




