import os

# Кореневий каталог, де знаходяться всі репозиторії
root_dir = 'D:\\Kofile\\TenantsConfig'

def is_git_repo(repo_path):
    """Перевіряє, чи є папка Git-репозиторієм."""
    return os.path.exists(os.path.join(repo_path, '.git'))

def update_git_config(repo_path):
    """Оновлює файл config у підпапці .git, додаючи ArthurMykhailiuk@ до рядка url."""
    config_path = os.path.join(repo_path, '.git', 'config')
    if os.path.exists(config_path):
        with open(config_path, 'r') as file:
            lines = file.readlines()
        
        with open(config_path, 'w') as file:
            for line in lines:
                if line.strip().startswith('url ='):
                    parts = line.split('url =')
                    if len(parts) == 2 and 'ArthurMykhailiuk@' not in parts[1]:
                        line = f"url = {parts[1].strip().replace('https://', 'https://ArthurMykhailiuk@')}\n"
                file.write(line)

def update_all_repos(root_directory):
    """Оновлює всі репозиторії в кореневому каталозі."""
    error_repos = []  # Масив для зберігання репозиторіїв з помилками
    for folder_name in os.listdir(root_directory):
        repo_path = os.path.join(root_directory, folder_name)
        
        if os.path.isdir(repo_path) and is_git_repo(repo_path):
            print(f"Updating repository: {repo_path}")
            try:
                update_git_config(repo_path)
                print(f"Config updated successfully in {repo_path}.")
            except Exception as e:
                print(f"An error occurred in {repo_path}: {e}")
                error_repos.append(repo_path)
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