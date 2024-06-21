<div align="center">

<img src="https://storage.googleapis.com/swara-app-storage/swara-assets/Group%206.svg" alt="Logo" width="500"/>

#### Swara Server API
[![GitHub total commits](https://img.shields.io/github/commit-activity/y/Swara-id/swara-server/main)](https://github.com/Swara-id/swara-server/commits/main)
[![GitHub commits](https://img.shields.io/github/last-commit/Swara-id/swara-server)](https://github.com/Swara-id/swara-server/commits/main)
[![GitHub contributors](https://img.shields.io/github/contributors/Swara-id/swara-server)](https://github.com/Swara-id/swara-server/graphs/contributors)

</div>

## **About**
Swara-server API is built using Node.js and Express, with Kysely as the database query builder. It is connected to a Google Cloud Platform (GCP) database and uses Google Cloud Storage for file storage. The API endpoints are documented using Swagger.



#### Installation
1. [Download swara-server](google.com) or [GIT CLONE](https://github.com/Swara-id/swara-server.git) and unzip the download.
2. Open the unzipped folder in your terminal.
3. Install the dependencies by running `npm install` in your terminal. 
4. Configure the `.env` file. See below for more details.
6. Start Swara-server by running `npm start` in your terminal.

#### configute .env.example
## Configure `.env.example`

```plaintext
# PostgreSQL
POSTGRES_USER=your-postgres-user
POSTGRES_PASSWORD=your-postgres-password
POSTGRES_DB=your-postgres-db
DATABASE_URL=your-database-url

# API Key
API_KEY=your-api-key

# Port
PORT=3000

# Cloud SQL
CONNECTION_STRING=your-cloud-sql-connection-string

# Firebase
FIREBASE_API_KEY=your-firebase-api-key
FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain
FIREBASE_PROJECT_ID=your-firebase-project-id
FIREBASE_STORAGE_BUCKET=your-firebase-storage-bucket
FIREBASE_MESSAGING_SENDER_ID=your-firebase-messaging-sender-id
FIREBASE_APP_ID=your-firebase-app-id
MEASUREMENT_ID=your-measurement-id
PROJECT_ID=your-project-id

# Google Cloud Storage Bucket
BUCKET_NAME=your-bucket-name
```

