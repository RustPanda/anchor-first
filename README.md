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
> Для тестов этого не надо делать

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

## Запускаем тесты
Для запуска тестов надо выполнить
```sh
$ anchor test
```

Вот что у меня выходит
```sh
➜  first git:(main) anchor test
BPF SDK: /home/golubevmt/.local/share/solana/install/releases/1.9.13/solana-release/bin/sdk/bpf
cargo-build-bpf child: rustup toolchain list -v
cargo-build-bpf child: cargo +bpf build --target bpfel-unknown-unknown --release
warning: unused variable: `ctx`
 --> programs/first/src/lib.rs:9:23
  |
9 |     pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
  |                       ^^^ help: if this is intentional, prefix it with an underscore: `_ctx`
  |
  = note: `#[warn(unused_variables)]` on by default

warning: `first` (lib) generated 1 warning
    Finished release [optimized] target(s) in 0.31s
cargo-build-bpf child: /home/golubevmt/.local/share/solana/install/releases/1.9.13/solana-release/bin/sdk/bpf/dependencies/bpf-tools/llvm/bin/llvm-readelf --dyn-symbols /home/golubevmt/anchor-lessons/first/target/deploy/first.so

To deploy this program:
  $ solana program deploy /home/golubevmt/anchor-lessons/first/target/deploy/first.so
The program address will default to this keypair (override with --program-id):
  /home/golubevmt/anchor-lessons/first/target/deploy/first-keypair.json
yarn run v1.22.10
warning package.json: No license field
$ /home/golubevmt/anchor-lessons/first/node_modules/.bin/ts-mocha -p ./tsconfig.json -t 1000000 'tests/**/*.ts'


  first
Your transaction signature MethodsBuilder {
  _args: [],
  _ixFn: [Function: ix] { accounts: [Function (anonymous)] },
  _txFn: [Function: txFn],
  _rpcFn: [AsyncFunction: rpc],
  _simulateFn: [AsyncFunction: simulate],
  _accounts: {},
  _remainingAccounts: [],
  _signers: [],
  _preInstructions: [],
  _postInstructions: [],
  _accountsResolver: AccountsResolver {
    _args: [],
    _accounts: {},
    _provider: Provider {
      connection: [Connection],
      wallet: [NodeWallet],
      opts: [Object]
    },
    _programId: PublicKey {
      _bn: <BN: a087d76070bbec0acffd8664bb52807b506cfd9c2920c373fe517929922b6c1c>
    },
    _idlIx: { name: 'initialize', accounts: [], args: [] },
    _accountStore: AccountStore {
      _provider: [Provider],
      _accounts: {},
      _cache: Map(0) {}
    }
  }
}
    ✔ Is initialized!


  1 passing (19ms)

Done in 1.45s.
```

Тут есть жалоба на `ctx`, необходимо добавить префикс `_`, что и сделаем.
```rust
pub fn initialize(_ctx: Context<Initialize>) -> Result<()> {
    Ok(())
}
```

Ну вот и все, жалоба только на поле лицензии в `package.json`, но с ним я не рабоал,
и добавлять поле не буду.