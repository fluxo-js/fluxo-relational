describe("Fluxo.Relation.HasOne", function () {
  before(function() {
    Post = Fluxo.Relational.Store.extend({
      relations: {
        author: {
          type: Fluxo.Relational.HasOne
        }
      }
    });
  });

  it("instantiate store on construction", function() {
    var post = new Post({ content: "The post", author: { name: "Foo" } });

    expect(post.data.author.data.name).to.be.eql("Foo");

    expect(post.data.content).to.be.eql("The post");

    expect(post.data.author).to.be.an.instanceof(Fluxo.Store);
  });

  it("bubble the change events", function() {
    var post = new Post({ content: "The post", author: { name: "Foo" } });

    var onChangeCallback = chai.spy();

    post.on(["author:change:name"], onChangeCallback);

    post.setAttribute("author", { name: "Bar" });

    expect(post.data.author.data.name).to.be.eql("Bar");

    expect(onChangeCallback).to.have.been.called.once();
  });

  it("nullify the attribute with falsy values", function() {
    var post = new Post({ content: "The post", author: {} });

    expect(post.data.author).to.be.an.instanceof(Fluxo.Store);

    post.setAttribute("author", null);

    expect(post.data.author).to.be.eql(null);
  });

  it("accepts a store instance", function() {
    var post = new Post({ content: "The post" }),
        author = new Fluxo.Store({ name: "Foo" });

    post.setAttribute("author", author);

    var onChangeCallback = chai.spy();

    post.on(["author:change:name"], onChangeCallback);

    post.setAttribute("author", { name: "Bar" });

    expect(onChangeCallback).to.have.been.called.once();
  });

  it("generates the correct JSON", function() {
    var post = new Post({ content: "The post", author: { name: "Foo" } });
    expect(post.toJSON()).to.be.eql({ content: "The post", author: { name: "Foo" } });
  });

  it("works with other store class", function() {
    var Category = Fluxo.Store.extend({}),
        Post = Fluxo.Relational.Store.extend({
          relations: {
            category: {
              type: Fluxo.Relational.HasOne,
              storeClass: Category
            }
          }
        });

    var post = new Post({ content: "The post", category: { name: "Foo" } });

    expect(post.data.category).to.be.an.instanceof(Category);
  });
});
