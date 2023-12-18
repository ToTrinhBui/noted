# Overview
This is a website that supports job management with frontend using Reactjs, backend using express of nodejs and database using MySQL

# Installation
   1. Be sure that you  installed Node.js (version compatible with React 18) on your system
   
   2. Install the project dependencies
      ```base
      npm install --force
      ```
   3. Setup database with MySQL
      
      - Open the MySQL software and execute the commands in the `schema.sql` file.
      - Modify the following properties in the `.env` file according to your database setup:
  
         ```base
         HTTPS=true
         MYSQL_HOST='127.0.0.1'
         MYSQL_USER='root'
         MYSQL_PASSWORD='12345'
         MYSQL_DATABASE='noted'
         ```

# Running the Application
   1. Start Backend Server:

   ```base
   node app.js
   ```

   2. In a new terminal window, start the Frontend:

   ```base
   npm start
   ```
   3. You can test the application with account below:

      email: nguyenvana@gmail.com
      
      password: 12345 

# Demo 

![dashboard](https://github.com/ToTrinhBui/noted/assets/94132849/a9b1109e-a966-463a-88e2-22bea6f4a2d7)

![kanbanx](https://github.com/ToTrinhBui/noted/assets/94132849/60b2679d-316f-473e-ab3e-e07eef78340b)

![tablex](https://github.com/ToTrinhBui/noted/assets/94132849/43ceb933-ee1d-49ca-82fd-0c4a63396245)

![chartx](https://github.com/ToTrinhBui/noted/assets/94132849/55e00dd6-9030-42de-8727-b80daa7ec89e)