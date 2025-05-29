import psycopg2

class DataBase():
    def getCursor():
        connection = psycopg2.connect(
            host="postgres-a940e244.railway.internal",
            database="railway",
            user= "postgres",
            password="fXWwjHXLjJIvQdsxmNyNnNnwWkjyodFw",
            port="5432"
        )
        return connection.cursor()

    def create():
        DataBase.getCursor()
       