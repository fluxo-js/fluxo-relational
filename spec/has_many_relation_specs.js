describe("Fluxo.Relation.HasMany", function () {
  before(function() {
    Post = Fluxo.Relational.Store.extend({
      relations: {
        comments: {
          type: Fluxo.Relational.HasMany
        }
      }
    });
  });

  it("instantiate collection store on construction", function() {
    var post = new Post({ content: "The post", comments: [{ name: "Foo" }] });

    expect(post.data.comments.toJSON()).to.be.eql({ data: {}, stores: [{ name: "Foo" }] });

    expect(post.data.content).to.be.eql("The post");

    expect(post.data.comments).to.be.an.instanceof(Fluxo.CollectionStore);
  });

  it("bubble events", function() {
    var post = new Post({ content: "The post", comments: [] });

    var onChangeCallback = chai.spy();

    post.on(["comments:add"], onChangeCallback);

    post.data.comments.addFromData({ content: "The post" });

    expect(onChangeCallback).to.have.been.called.once();
  });

  it("generates the correct JSON", function() {
    var post = new Post({ content: "The post", comments: [{ name: "Foo" }] });

    expect(post.toJSON()).to.be.eql({
      content: "The post",
      comments: {
        data: {},
        stores: [{ name: "Foo" }]
      }
    });
  });
});
