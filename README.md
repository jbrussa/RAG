# RAG SITE

Proyecto de construcción de sitos utilizando RAG.

## Backend

### Requisitos:

- Instalar python 3.10 o superior
- Crear entorno virtual con el siguiente comando:

```
cd [carpeta del proyecto]
python -m venv venv
```

### Activar entorno

- En windows: .\venv\Scripts\activate
- En linux: . venv/bin/activate

### Instalar librerias

- Activar entorno (paso anterior)

- Actualizar PIP

```
pip install --upgrade pip
```

- Instalar librerías

```
pip install -r requirements.txt
```

### Para ejecutar

- Si se ejecuta por primera vez, primero correr el archivo sample_load_files.py con el siguiente comando

```
python sample_load_files.py
```

también se debe instalar fastapi

```
pip install "fastapi[all]
```

- Para ejecutar el backend, se utiliza el siguiente comando

```
fastapi dev app.py
```

## Frontend
