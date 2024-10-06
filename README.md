 
# Apna Store

## Overview
**Apna Store** is a simple e-commerce website that allows users to browse products, add them to the cart, and proceed to checkout.

## Features
- Product listing with categories
- Add to cart functionality
- Dynamic cart updates
- Order management
- Transaction filtering using search functionality
- Responsive design

## Technologies Used
- **Backend**: PHP (without any framework)
- **Frontend**: HTML, CSS (with custom styles in `myStyle.css`), JavaScript
- **Database**: MySQL
- **Version Control**: Git

## Installation
Follow these steps to run Apna Store locally:

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/apna-store.git
    ```

2. Navigate to the project directory:
    ```bash
    cd apna-store
    ```

3. Set up your database and import the provided SQL file:
    - Create a new database in MySQL.
    - Import the SQL dump (`apna_store.sql` or similar) into your MySQL database.

4. Configure the database connection:
    - Open the `config.php` (or similar) file and update the database credentials.

5. Start the PHP development server:
    ```bash
    php -S localhost:8000
    ```

6. Open your browser and navigate to:
    ```
    http://localhost:8000
    ```
