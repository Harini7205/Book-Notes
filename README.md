# Bookify: Your Personal Book Notes

Bookify is a full-stack web application designed for creating and managing a personal collection of book reviews. Users can browse, search, and sort through the book entries, while an admin has full CRUD (Create, Read, Update, Delete) functionality to manage the content. The application automatically fetches book covers from the Open Library API using the book's ISBN.

Check it out live on https://book-notes-7nmh.onrender.com/

## Features

*   **View & Browse:** Display a grid of all book notes, including cover, title, author, rating, and review.
*   **Sort Books:** Sort the book collection by title, author, or rating.
*   **Live Search:** Search for books by title with real-time suggestions.
*   **Admin Authentication:** Secure login for an administrator to manage the book collection.
*   **Add/Update Books:** Admins can add new books or update existing ones. Book covers are fetched automatically from the Open Library API.
*   **Delete Books:** Admins can remove book entries from the database.
*   **PostgreSQL Integration:** All book data is stored in a persistent PostgreSQL database.

## Tech Stack

*   **Backend:** Node.js, Express.js
*   **Database:** PostgreSQL 
*   **Frontend:** EJS, CSS, Client-side JavaScript
*   **APIs:** Open Library Covers API

## Getting Started

Follow these instructions to set up and run a local instance of the Bookify application.

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/harini7205/Book-Notes.git
    cd Book-Notes
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Set up Environment Variables:**
    Create a file named `.env` in the root directory and add your database and admin credentials.

    ```env
    # Admin Credentials
    ADMIN_USER=your_admin_username
    ADMIN_PASSWORD=your_admin_password

    # PostgreSQL Database Connection Details
    DB_USER=your_db_user
    DB_HOST=your_db_host
    DB_NAME=your_db_name
    DB_PASSWORD=your_db_password
    DB_PORT=your_db_port
    ```

4.  **Set up the Database:**
    Connect to your PostgreSQL instance and run the following SQL command to create the necessary `books` table.

    ```sql
    CREATE TABLE books (
        id SERIAL PRIMARY KEY,
        isbn VARCHAR(13) UNIQUE NOT NULL,
        title VARCHAR(255) NOT NULL,
        author VARCHAR(255),
        rating INT,
        review TEXT,
        image BYTEA
    );
    ```

5.  **Run the application:**
    ```sh
    npm start
    ```
    The application will be running at `http://localhost:3000`.

## Usage

### General User

*   Navigate to `http://localhost:3000` to see the collection of book reviews.
*   Use the search bar to find books by title.
*   Use the "Sort By" dropdown to reorder the books on the page.
*   Click the "Get Book" link on a book card to search for it on Amazon.

### Admin

1.  Click the **"Login as admin"** button on the top right.
2.  Enter the `ADMIN_USER` and `ADMIN_PASSWORD` you defined in your `.env` file.
3.  Once logged in, you will have access to administrative features:
    *   **Add a new book:** Click the "Add new book" button.
    *   **Edit a review:** Click the "Edit review" link on any book card.
    *   **Delete a review:** Click the "Delete review" link on any book card.
