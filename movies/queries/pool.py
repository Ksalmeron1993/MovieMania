import os
from psycopg_pool import ConnectionPool

pool = ConnectionPool(conninfo=os.environ["DATABASE_URL"])




#connection pool takes a number of parameters to configure the connection pool, 
#including the connection information for the PostgreSQL database. In this case, 
# it uses the value of the DATABASE_URL environment variable as the connection info.
#Once the connection pool object is created,
# you can use it to manage a pool of database connections

