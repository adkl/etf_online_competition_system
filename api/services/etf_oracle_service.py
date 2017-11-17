from django.db import connection, connections


cursor = connections['etf-oracle'].cursor()


class EtfOracleService:

    def connect(self):
        pass

    @classmethod
    def executeQuery(cls, query=None):

        cursor.execute(query)
        res = cursor.fetchall()
        return res
