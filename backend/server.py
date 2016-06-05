from __future__ import print_function
import urllib2
import json

from flask import Flask, Response, request
from flask_cors import CORS, cross_origin

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


app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route('/query')
@cross_origin()
def query():
    xmin = request.args.get('xmin')
    ymin = request.args.get('ymin')
    xmax = request.args.get('xmax')
    ymax = request.args.get('ymax')
    dataset = request.args.get('dataset')
    geojson = bg_query(dataset, float(xmin), float(ymin), float(xmax), float(ymax))
    return Response(geojson, mimetype='application/json') 


if __name__ == '__main__':
    app.run()


