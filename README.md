# Изучаю framework anchor.

## Что будет в этом примере
- Как создать новый проект
- Поправить тесты (rpc - deprecated)
- Установить новый program-id
- Выполнить все тесты

## Создание проекта
Для создания нового anchor проекта необходимо выполнить
```sh
$ anchor init <project name>
```

Сгенерировать новый кошелек
```sh
$ solana-keygen new
```

Запустить локальный тестовый валидатор сети solana
```sh
$ solana-test-validator
```

## Поправим тесты
Тесты ругаются на вызов deprecated метода `rpc`. Я поменял на `methods`
```tx
...
const tx = await program.methods.initialize();
...
```

## Обновим открытый ключ нашей программы
Особо не представляю как это работает в anchor, но при init проекта в `declare_id` и
в `[programs.localnet]` находится default публичный ключ программы. Нам надо поменять
его на настоящий ключ, который будет сгенерирован при первом вызове `$ anchor build`
```sh
$ anchor build
$ anchor keys list
```
Вот что выводит мой терминал
```sh
➜  first git:(main) anchor keys list
first: BoeNUzUVRwqA4xUjL3dmoypZaFSJDMPz5MkWPL1gTZiK
```
Добавлю этот ключ в макрос [declare_id!(<key>)](./programs/first/src/lib.rs) и в [[programs.localnet]](./Anchor.toml)

```rust
declare_id!("BoeNUzUVRwqA4xUjL3dmoypZaFSJDMPz5MkWPL1gTZiK");
```
```toml
[programs.localnet]
first = "BoeNUzUVRwqA4xUjL3dmoypZaFSJDMPz5MkWPL1gTZiK"
```
