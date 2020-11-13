# .NetCore-CreateTemplate

Adicionar a seguinte pasta na raiz do projeto ou grupo de projetos em que se deseja gravar como template/modelo:
```
.template.config
```

Dentro da pasta criada, adicione um novo arquivo com o seguinte código:
```
{
    "$schema": "http://json.schemastore.org/template",
    "author": "Vitor Moschetta",
    "classifications": [
        "Frontend",
        "UIkit"
    ],
    "name": "Frontend UIkit",
    "identity": "Moschetta.FrontendUIkit.CSharp",
    "shortName": "frontuikit",
    "tags": {
        "language": "C#",
        "type": "project"
    }
}
```
Dê a ele o nome de 'template.json'


Execute o seguinte comando no diretório da pasta '.template.config':
```
dotnet new -i .\
```


Pronto, só usar seu novo template para criar aplicações de forma mais rápida.
O nome do nosso template criado é 'frontuikit'. Execute para criar:

```
dotnet new frontuikit
```
