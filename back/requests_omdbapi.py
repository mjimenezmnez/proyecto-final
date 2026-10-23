import requests as consulta 
import os 
from dotenv import load_dotenv

load_dotenv()

class MovieApi:

    def __init__(self):
        self.api_key = os.getenv('API_KEY')
        self.url = ('http://www.omdbapi.com/')
        

    def get_title_year(self, title : str, year=None):
        
        if year is None:
            response = consulta.get(self.url, params={'s':title, 'apikey':self.api_key})
        else:
            response = consulta.get(self.url, params={'s':title, 'y': year, 'apikey':self.api_key})
        
        if response.status_code == 200:
            return response.json()
        else:
            return None

        

    def get_title_id(self, id:str):
        
        response = consulta.get(self.url, params={'i': str(id), 'apikey': self.api_key})
        
        if response.status_code == 200:
            return response.json()
        else:
            return None

