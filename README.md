#FluxoRelational

Sometimes you need that some internal attributes of your store behave like
stores, so you are searching for FluxoRelational.

FluxoRelational add to your Fluxo store the capability to easily work with nested
stores.

#Usage

Lets say that you have a `Post` store that have an author and comments that
author and comments need be stores. You'll need create your store using the
`Fluxo.Relational.ObjectStore#create` and specify the attributes that are
children stores on the `relations` store structure property. On this property
you can declare if your attributes are a collections of stores (has many) or
a single stores (has one). Look the implementation below.

```js
var PostStructure = {
  relations: {
    author: { type: Fluxo.Relational.HasOne },
    comments: { type: Fluxo.Relational.HasMany }
  }
};

var post = Fluxo.Relational.ObjectStore.create(PostStructure);

post.set({
  author: { name: "Fluxo Team" },
  comments: [
    { content: "Wow, this is great!" },
    { content: "More one comment" }
  ]
});
```

##Setters
On the example above ff you call `post.setAttribute("author", { name: "New Name" });`
internally it will call `post.data.author.set({ name: "New Name" });` and post will
emit the `change` and `author:change:name` events.

On the collection the `post.setAttribute("comments", [{ content: "Hello!" }]);`
will call the collection `resetStores` with the passed array.

If the actual attribute value is null the relation will create the object internally,
if the attribute is already a Fluxo store the parent will just call the child
`set`. If you set null/false/undefined on attribute that is a Fluxo store
the parsed store will be removed.

##JSON
Calling the `toJSON` on a Fluxo relational store will recursively call the children's
`toJSON`, so the JSON of our store above gonna be something like this:

```js
{
  author: {
    cid: "FS:1",
    name: "Fluxo Team"
  },
  comments: {
    data: {
      cid: "FS:2"
    },
    stores: [
      {
        cid: "FS:3",
        name: "Wow, this is great!"
      },
      {
        cid: "FS:4",
        name: "More one comment"
      }
    ]
  }
}
```

##Events

Every children stores events gonna be bubbled up to the parent, so, if you call
`post.data.author.setAttribute("name", "Fluxo")` the `post` store will trigger
the `author:change:name`. The structure of the events on the parent always gonna
be `<relation-name>:<event-name>`.
