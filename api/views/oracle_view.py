from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(['POST'])
def oracle_view(request):
    return Response({'ma_daj': 'poy'})

