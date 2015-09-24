describe("Fluxo.Relation.HasOne", function () {
  before(function() {
    Post = {
      relations: {
        author: {
          type: Fluxo.Relational.HasOne
        }
      }
    };
  });

  it("instantiate store on construction", function() {
    var post = Fluxo.Relational.ObjectStore.create(Post, {
      data: {
        content: "The post",
        author: { name: "Foo" }
      }
    });

    expect(post.data.author.data.name).to.be.eql("Foo");

    expect(post.data.content).to.be.eql("The post");

    expect(post.data.author._fluxo).to.be.true;
  });

  it("bubble the change events", function() {
    var post = Fluxo.Relational.ObjectStore.create(Post, {
      data: {
        content: "The post",
        author: { name: "Foo" }
      }
    });

    var onChangeCallback = chai.spy();

    post.on(["author:change:name"], onChangeCallback);

    post.setAttribute("author", { name: "Bar" });

    expect(post.data.author.data.name).to.be.eql("Bar");

    expect(onChangeCallback).to.have.been.called.once();
  });

  it("nullify the attribute with falsy values", function() {
    var post = Fluxo.Relational.ObjectStore.create(Post, {
      data: {
        content: "The post",
        author: { name: "Samuel" }
      }
    });

    expect(post.data.author._fluxo).to.be.true;

    post.setAttribute("author", null);

    expect(post.data.author).to.be.eql(null);
  });

  it("accepts a store instance", function() {
    var post = Fluxo.Relational.ObjectStore.create(Post, {
      data: {
        content: "The post"
      }
    });

    var author = Fluxo.ObjectStore.create({ data: { name: "Foo" } });

    post.setAttribute("author", author);

    var onChangeCallback = chai.spy();

    post.on(["author:change:name"], onChangeCallback);

    post.setAttribute("author", { name: "Bar" });

    post.setAttribute("author", null);

    author.setAttribute("name", "Baz");

    expect(onChangeCallback).to.have.been.called.once();
  });

  it("generates the correct JSON", function() {
    var post = Fluxo.Relational.ObjectStore.create(Post, {
      data: {
        content: "The post",
        author: { name: "Foo" }
      }
    });

    expect(post.toJSON().content).to.be.eql("The post");
    expect(post.toJSON().author.name).to.be.eql("Foo");
  });

  it("works with other store class", function() {
    var Category = {
      customMethod: {}
    };

    var post = Fluxo.Relational.ObjectStore.create({
      data: {
        content: "The post",
        category: { name: "Foo" }
      },

      relations: {
        category: {
          type: Fluxo.Relational.HasOne,
          storeObject: Category
        }
      }
    });

    expect(post.data.category.data.name).to.be.eql("Foo");
    expect(post.data.category.setAttribute).to.exist;
    expect(post.data.category.customMethod).to.exist;
  });
});
