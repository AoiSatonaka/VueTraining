# VueTraining

## 目的

- Nuxtを使うことになったので、爆速でVueを修める。

## 勉強メモ

### 始め方

- scriptタグで読み込む方法
- npmを用いる方法

### Vueコンポーネント

#### 

#### 注意点

- dataディレクティブの扱い
  - Vueインスタンスでは
    ```javascript
    data: {
      ...
    }
    ```
    という書き方ができていたが、  
   Vueコンポーネントでは
    ```javascript
    data() {
      return {
        ...
      }
    }
    ```
    という関数の返り値として扱う

- 順序
  - Vueインスタンス生成前に登録して置かなければならない

- 

#### ローカルコンポーネント

- Vueインスタンスのcomponentsオプションで登録コンポーネントはローカル登録される。

- ローカルに登録されたコンポーネントは、登録されたコンポーネント内でしか呼び出せない
  - 上記から、必要に応じて複数回ローカル登録する必要がある。

- 特に理由がなければ、以下の理由からローカル登録でコンポーネントを利用するほうがいい
  - どのコンポーネントを利用しているのかがわかりやすくなる。
  - 不要になった時点でローカル登録から削除して問題ないか判断しやすくなる。


#### グローバルコンポーネント

- Vueのcomponentメソッドを使用して作成されたコンポーネントはグローバルに登録される。

- グローバルに登録されたコンポーネントはVueのテンプレート上のどこからでも呼び出して使用可能
  - 上記から、登録しているが使用していないものまで読み込みが発生してしまうためビルドが長くなったり、アプリケーションが肥大化してしまう。

- 

#### 親to子のデータの運搬

- 基本的にコンポーネント内に登録したデータは、他のコンポーネントからの参照や更新が負荷となっている。

- propsを使用してデータを伝える
  
  - 子コンポーネントに
    ```javascript
    props: {
      propname: {
        type: dataType
        },
      ...
    },
    ``` 
  
    というプロパティの宣言をする
    - ex.)
      ```javascript
      props: {
        user: {
          type: Object
        }
      }
      ```
  - 親からの呼び出し方は、
    ```html
      <tagname propname="xxx">これが原型だが</tagname>

      <tagname :propname="dataname">  <!-- :xxxx === v-vind:xxxx -->
        このようにデータをバインディングするのが普通
      </tagname>
    ```

  - propsはイミュータブル
    - v-model等を用いて子コンポーネントでpropsを直接書き換えることはできないようになっている。
    - jsのconstと同じで、再代入をしない変更(Objectのプロパティを書き換える等)であれば可能となっている。
      - ただ、これはデータの流れを複雑にしてしまうため、やってはいけない。
      - 親から受け取った値を変更したいのなら、propsをdataに格納した上で変更して、  
        下記の子から親へのデータの運搬をすることで親のデータを書き換えるのが正しい。 

#### Vueの命名規則

- v-vind
  - ケバブケース(xxxx-yyyy-zzzz)
- props
  - キャメルケース(xxxxYyyyZzzz)
  - 正確にはローワーキャメルだと思われる、、、

#### 子to親のデータの運搬

1. this.$emitという関数で親側で定義したイベントを発火させることでデータを運搬する

   - ex.)
    ```javascript
    const Child= {
      data() {
        return {
          testChild: "test"
        }
      },
      methods: {
        update() {
          this.$emit("update:test", this.testChild);
        }
      },
      template:`
        <button @click="update">送信</button>
      `
    }

    const Parent = {
      components: {
        child: child
      },
      data(){
        return {
          testParent: ""
        }
      },
      methods: {
        updateTestChild(){
          this.testParent = $event;
        }
      },
      template:`
        <child @update:test="updateTestChild"></child>
      `
    }
    ```
   - this.$emit()の引数
     - 第一引数： イベント名（上記では親で定義していたupdate:test）
     - 第二引数：　親の$eventで受け取るデータ(上記ではthis.test)

2. .sync修飾子を使用して上記を省略する方法
   
   - 親コンポーネントから、データをバインドしてそれを子で書き換える場合は、  
     「v-vind:xxxx」の最後に「.sync」を付け足すことで、記述量を減らすことができる。
   - この際、子コンポーネントのthis.$emitの第一引数で命名規則が発生するので注意すること。
     - "update:(propsName)" 

   - ex.)
      ```javascript
      const Child= {
        props: {
          test: {type: String}
        },
        data() {
          return {
            testChild: this.test
          }
        },
        methods: {
          update() {
            this.$emit("update:test", this.testChild);
          }
        },
        template:`
          <div>
            <input v-model="testChild" />
            <button @click="update">送信</button>
          </div>
        `
      }

      const Parent = {
        components: {
          child: child
        },
        data(){
          return {
            testParent: ""
          }
        },
        template:`
          <child :test.sync="testParent"></child>
        `
      }
      ```
