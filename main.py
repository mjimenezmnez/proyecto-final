import requests as consulta 
import os 
from dotenv import load_dotenv

load_dotenv()

respuesta = consulta.get('http://www.omdbapi.com/?i=tt3896198&apikey=c0e4abb1')

#print('respuesta http: ', respuesta.status_code)
#print('cabecera: ', respuesta.headers['content-type'])
#print('encoding: ', respuesta.encoding)
#print('string: ', respuesta.text)
#print('respuesta en json: ', respuesta.json())

class MovieApi:

    def __init__(self):
        self.api_key = os.getenv('API_KEY')
        self.url = (f'http://www.omdbapi.com/')
        

    def get_title(self, title, year=None):
        """
        Solo muestra lo primero con ese resultado 
        """
        final_response = []
        if year is None:
            response = consulta.get(f'{self.url}{self.search}{title}{self.api_key}')
        else:
            response = consulta.get(f'{self.url}{self.search}{title}{self.api_key}')
            final_response.append(response.json())
            return final_response
        
    def get_title_year(self, title, year):

        pass

    def get_title_id(self, id):
        pass


api = MovieApi()

#print(api.get_title('Harry Potter'))
print(consulta.get('http://www.omdbapi.com/?s=Harry+Potter&apikey=c0e4abb1').json())