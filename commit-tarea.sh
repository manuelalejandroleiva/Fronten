#!/bin/bash
# Uso: ./commit-tarea.sh crear-filtro
# Si no le pasas nada, usa el nombre de la rama

TAREA="$1"

if [ -z "$TAREA" ]; then
  TAREA=$(git branch --show-current)
fi

# Limpia el nombre: minúsculas y guiones
TAREA=$(echo "$TAREA" | tr '[:upper:]' '[:lower:]' | tr ' ' '-' | tr '_' '-')

if [ -z "$TAREA" ]; then
  echo "❌ Pásame el nombre: ./commit-tarea.sh crear-filtro"
  exit 1
fi

echo "Haciendo commit por fichero con tarea: [$TAREA]"
echo "------------------------------------------"

# Toma todos los ficheros cambiados
git status --porcelain | awk '{print $2}' | while read f; do
  # Nombre bonito: src/pages/Home.tsx -> Home.tsx
  NOMBRE=$(basename "$f")

  git add "$f"
  git commit -m "feat($TAREA): $NOMBRE"
  echo "✅ $NOMBRE -> feat($TAREA): $NOMBRE"
done

echo ""
echo "Listo! Revisa con: git log --oneline"