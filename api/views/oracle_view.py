import base64
from rest_framework.decorators import api_view
from rest_framework.response import Response
from api.services import EtfOracleService

@api_view(['POST'])
def oracle_view(request):

    query = base64.b64decode(request.data['query'])
    res = EtfOracleService.executeQuery(query.decode('ascii'))
    # TODO finish serialization of the response
    return Response({'res': res})

