from __future__ import print_function
import urllib2
import json

from BigDataDBs import DB_map

BASE_URL = 'http://egis.hud.opendata.arcgis.com/datasets/%s.geojson?where=&geometry={"xmin":%f,"ymin":%f,"xmax":%f,"ymax":%f,"spatialReference":{"wkid":102100}}'


def bg_query(dataset, xmin, ymin, xmax, ymax):
    url = BASE_URL % (DB_map[dataset], xmin, ymin, xmax, ymax) 
    print('Fetching data from: \n', url)
    res = urllib2.urlopen(url)
    data = res.read()
    # second read acts as wait for 1st read to finish
    res.read()
    geojson = data.decode('utf-8')
    return geojson


def lambda_func(event, ctx):
    dataset = event['dataset']
    xmin = event['xmin']
    ymin = event['ymin']
    xmax = event['xmax']
    ymax = event['ymax']
    geojson = bg_query(dataset, float(xmin), float(ymin), float(xmax), float(ymax))
    return json.loads(geojson)


if __name__ == '__main__':
    xmin = -10885292.097177874
    ymin = 3534964.13784741
    xmax = -10875622.813099798
    ymax = 3540754.2427400113
    dataset = 'School Proficiency'
    event = dict(xmin=xmin, ymin=ymin, xmax=xmax, ymax=ymax, dataset=dataset)
    from pprint import pprint
    pprint(lambda_func(event, None))
