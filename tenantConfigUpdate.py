import subprocess
import os

# Кореневий каталог, де знаходяться всі репозиторії
root_dir = 'D:\\Kofile\\TenantsConfig'

def is_git_repo(repo_path):
    """Перевіряє, чи є папка Git-репозиторієм."""
    return os.path.exists(os.path.join(repo_path, '.git'))

def git_pull(repo_path, error_repos):
    """Виконує git pull для вказаного репозиторію."""
    try:
        # Переходимо до каталогу з репозиторієм
        os.chdir(repo_path)
        
        # Виконуємо git pull
        result = subprocess.run(['git', 'pull'], capture_output=True, text=True)
        
        # Виводимо результат
        if result.returncode == 0:
            print(f"Pull completed successfully in {repo_path}.")
            print(result.stdout)
        else:
            print(f"Error during pull in {repo_path}:")
            print(result.stderr)
            error_repos.append(repo_path)

    except Exception as e:
        print(f"An error occurred in {repo_path}: {e}")
        error_repos.append(repo_path)

def update_all_repos(root_directory):
    """Оновлює всі репозиторії в кореневому каталозі."""
    error_repos = []  # Масив для зберігання репозиторіїв з помилками
    for folder_name in os.listdir(root_directory):
        repo_path = os.path.join(root_directory, folder_name)
        
        if os.path.isdir(repo_path) and is_git_repo(repo_path):
            print(f"Updating repository: {repo_path}")
            git_pull(repo_path, error_repos)
            print("-" * 40)
        else:
            print(f"Skipping: {repo_path} is not a Git repository.")
            print("-" * 40)
            
        # Виводимо репозиторії з помилками
    if error_repos:
        print("Repositories with errors:")
        for repo in error_repos:
            print(repo)
    else:
        print("All repositories updated successfully.")
            
# Викликаємо функцію оновлення всіх репозиторіїв
update_all_repos(root_dir)