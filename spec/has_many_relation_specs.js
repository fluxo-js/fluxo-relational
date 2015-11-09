var Fluxo = require("../src/fluxo_relational.js");

class Post extends Fluxo.Relational.ObjectStore {}

Post.relations = {
  comments: {
    type: Fluxo.Relational.HasMany
  }
};

describe("Fluxo.Relation.HasMany", function () {
  it("instantiate collection store on construction", function() {
    var post = new Post({ content: "The post", comments: [{ name: "Foo" }] });

    expect(post.toJSON().comments.stores[0].name).to.be.eql("Foo");

    expect(post.data.content).to.be.eql("The post");
  });

  it("bubble events", function() {
    var post = new Post({ content: "The post", comments: [] });

    var onChangeCallback = chai.spy();

    post.on(["comments:add"], onChangeCallback);

    post.data.comments.addStore({ content: "The post" });

    expect(onChangeCallback).to.have.been.called.once();
  });

  it("generates the correct JSON", function() {
    var post = new Post({ content: "The post", comments: [{ name: "Foo" }] });

    expect(post.toJSON().content).to.be.eql("The post");
    expect(post.toJSON().comments.stores[0].name).to.be.eql("Foo");
  });
});
