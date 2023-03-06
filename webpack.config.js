const path = require('path')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(_dirname,'dist'),
    filename: 'bundle.js'
  },
  watch: true
}

// estamos a exportar um objeto c/ diferentes propriedades que representam
// a configuração do webpack por nós

/* primeiro, especificamos um modo (mode) e demos um nome específico, no caso "development" faz sentido,
 segundo demos um modelo de entrada (entry) que é o ficheiro de entrada, ao qual precisamos especificar
o caminho onde o webpack deve começar (lock) para o nosso ficheiro de js e em último lugar temos uma
propriedade de entrada (path) que é um objeto e ai temos um caminho (path) onde uma pasta ou um diretório
 aponta, nós queremos que seja a pasta "dist". Para fazer isso, precisamos de um módulo do caminho (path module),
que está descrito na primeiro linha de código e depois usamos o método "resolve" e o nome "_dirname" basicamente
serve para mostrar o caminho absoluto de um diretório que contém o ficheiro que está a correr (dentro do "dist).
No final, damos um nome para esse ficheiro "bundle.js" e depois temos a propriedade watch p/ true que quando corremos
o webpack ele vai ver (watch) a pasta index.js e sempre que fazemos uma mudança, ele vai dar bundle ou seja,
vai compilar dentro do bundle.js.*/