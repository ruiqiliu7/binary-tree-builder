# Binary Tree Builder

## Project Description
This project is a Binary Tree Builder application built with Django for the backend and ReactJS for the frontend. The application allows users to:
- Drag and drop nodes onto a canvas to create a binary tree.
- Connect nodes as parent and child.
- Edit the value of nodes.
- Export the tree structure to a JSON file.

## Project Setup

### Prerequisites
- Python 3.x
- Node.js and npm

### Backend Setup (Django)

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/ruiqiliu7/binary-tree-builder.git
    cd binary-tree-builder/BinaryTreeBuilderProject
    ```

2. **Create a Virtual Environment**:
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    ```

3. **Install Dependencies**:
    ```bash
    pip install -r requirements.txt
    ```

4. **Run Migrations**:
    ```bash
    python manage.py migrate
    ```

5. **Start the Backend Server**:
    ```bash
    python manage.py runserver
    ```

### Frontend Setup (ReactJS)

1. **Navigate to the Frontend Directory**:
    ```bash
    cd frontend
    ```

2. **Install Dependencies**:
    ```bash
    npm install
    ```

3. **Start the Frontend Server**:
    ```bash
    npm start
    ```

## Running the Application

1. **Start the Django Backend**:
    Ensure your virtual environment is activated and run:
    ```bash
    python manage.py runserver
    ```
    This will start the backend server at `http://localhost:8000`.

2. **Start the React Frontend**:
    Open a new terminal, navigate to the `frontend` directory, and run:
    ```bash
    npm start
    ```
    This will start the frontend server at `http://localhost:3000`.

3. **Access the Application**:
    Open your browser and navigate to `http://localhost:3000` to access the application.

## Usage Instructions

1. **Drag and Drop Nodes**:
    - Use the left panel to drag and drop nodes onto the canvas.
    - The root node can be dragged only once.
    - Child nodes can be dragged and connected to the root or other nodes.
    - Drag a node and drop it out of the canvas to delete it.

2. **Connect Nodes**:
    - Use the tool bar to connect and disconnect nodes.
    - Click on a node to select it as the starting point.
    - Click on another node to create a connection (parent to child).

3. **Edit Node Values**:
    - Click on a node to select it.
    - Use the right panel to edit the node's value.

4. **Export the Tree Structure**:
    - Use the export button in the right panel to export the current tree structure to a JSON file.

## Project Structure
- **binary_tree_builder/**: Contains the Django project settings.
- **binarytree/**: Contains the app-specific Django code.
- **frontend/**: Contains the ReactJS frontend code.
- **requirements.txt**: Python dependencies.
- **package.json**: Node.js dependencies.
- **venv/**: Virtual environment files.

## Contact
If you have any questions or need further assistance, please contact Ruiqi Liu at <liu.ruiqi3@northeastern.edu>.
