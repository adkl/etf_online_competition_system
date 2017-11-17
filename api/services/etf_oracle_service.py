from django.db import connections

cursor = connections['etf-oracle'].cursor()


class EtfOracleService:

    @classmethod
    def execute_query(cls, query=None):
        cursor.execute(query)
        res = cursor.fetchall()
        return res
