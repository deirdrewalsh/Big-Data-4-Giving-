__author__ = 'Reedholm'

DB_map = {'Low Poverty' : 'a4d78dc882bb456da6200b574bfb9e12_0',
          'Promise Zones' : 'a10cbd9187a34bd2a28574a3cfe12e64_0',
          'Low to Moderate Income' : '524ba0cb19cd4c7f85789e4b445797c9_0',
          'Location Affordability' : '27b53ea69f98474eb002ac3b9c6b51eb_0',
          'Fair Market Rents' : '24af423b6a5c4c09b82df1f7d39cccd2_0',
          'Jobs Proximity' : '636ecbfb0ee5480ea5b68e65991e4815_0',
          'Low Income Housing Tax Credit Properties' : '9bbb7cde9fc74d91b444d03e5887ea1e_0'}

def bg_db_names():
    return DB_map.keys()

def bg_db_keys(db_name):
    return DB_map[db_name]

