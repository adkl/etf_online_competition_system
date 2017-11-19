from django.db import connections



class EtfOracleService:

    @classmethod
    def execute_query(cls, query=None):
        cursor = connections['etf-oracle'].cursor()
        cursor.execute(query)
        res = cursor.fetchall()
        return res
