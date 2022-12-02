const input = "mul 3 sub 2 sum 1 3 4";

const lex = (str) => str.split(" ").filter((s) => s.length > 0);

const OP = Symbol("OP");
const NUM = Symbol("NUM");

const parser = (tokens) => {
  let i = 0;

  const peek = () => tokens[i];
  const consume = () => tokens[i++];

  let currNode, root;

  while (peek()) {
    const val = consume();

    if (/\d+/.test(val)) {
      currNode.params.push({
        type: NUM,
        val,
      });
    } else {
      const node = {
        type: OP,
        val,
        params: [],
      };

      if (currNode) {
        currNode.params.push(node);
      } else {
        root = node;
      }
      currNode = node;
    }
  }
  return root;
};

const ast = parser(lex(input));

// pre-order traverse
const transpiler = (ast) => {
  const mapping = { sum: "+", mul: "*", sub: "-", div: "/" };
  if (ast.params) {
    let str = `(${ast.params[0].val} `;
    for (let i = 1; i < ast.params.length; i++) {
      str += `${mapping[ast.val]} ${transpiler(ast.params[i])}`;
      if (i !== ast.params.length - 1) str += " ";
    }
    str += ")";
    return str;
  } else {
    return ast.val;
  }
};
const transpiled = transpiler(ast);
console.log(transpiled);

console.log(eval(transpiled));

console.log(JSON.stringify(ast));
