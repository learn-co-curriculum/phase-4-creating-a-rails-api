# Creating a Rails API from Scratch

## Learning Goals

- Use the `--api` flag to create an API-only Rails app
- Use the `resource` generator

## Introduction

We've spent a lot of time now focusing on the backend, and now's a great
opportunity to see what we can actually do with all the power of a Rails API to
support a frontend application as well.

Throughout this section, we'll be building a DVD shop. We'll have a Rails API to
support a React frontend application, and we'll be focusing on how that
client-server communication process works, as well as some challenges involved
in communicating between two separate applications.

In this lesson, we'll start by building the Rails backend from scratch and talk
through some of the typical configuration when creating a new Rails API.

## Generating a Rails API

Just like we saw at the beginning of the phase, we can use `rails new` to
generate a new Rails application. We'll run that same command with a few
additional options to optimize our Rails app. Let's generate the backend code
for our `dvd-shop`:

```sh
rails new dvd-shop --api --minimal -G
```

- `--api`: this flag will create our new application with some additional
  API-specific configuration, and will skip the code for generating `.erb` files
  with ActionView.
- `--minimal`: this flag skips a lot of additional Rails features that we
  won't use in our API, such as code for sending emails and processing images.
  Read more about the [`--minimal` flag][--minimal].
- `-G`: don't initialize a Git repository. Since this lab is already in a Git
  repository, we don't need to create a new repo for the Rails API. Typically,
  you **do** want to initialize a Git repo for your Rails projects, so you
  generally will not be using this flag.

With that code in place, let's generate the code for handling our first request
from the client.

## Using the Resource Generator

One of the main features of our frontend application will be to display a list
of movies. For that feature, we'll want our API to handle a `GET` request to
`/movies`.

To get that request working, we'll need to create a **route** and **controller**
action on our Rails server. We'll also need a **model** to interact with the
database, and a **migration** to generate the corresponding database table for
this model.

For our `Movie` model, we'll want a table with the following attributes:

<table border="1" cellpadding="4" cellspacing="0">
  <tr>
    <th>Column Name</th>
    <th>Data Type</th>
  </tr>
  <tr>
    <td>title</td>
    <td>string</td>
  </tr>
  <tr>
    <td>year</td>
    <td>integer</td>
  </tr>
  <tr>
    <td>length</td>
    <td>integer</td>
  </tr>
  <tr>
    <td>description</td>
    <td>string</td>
  </tr>
  <tr>
    <td>poster_url</td>
    <td>string</td>
  </tr>
  <tr>
    <td>category</td>
    <td>string</td>
  </tr>
  <tr>
    <td>discount</td>
    <td>boolean</td>
  </tr>
  <tr>
    <td>female_director</td>
    <td>boolean</td>
  </tr>
</table>

We could create the route, model, controller, and migration individually, but
since this kind of operation is pretty common for a Rails developer, there's a
handy generator that will set up all the code we need: `rails g resource`.

Navigate into the `dvd-shop` directory and run this code in your terminal:

```sh
rails g resource Movie title year:integer length:integer director description poster_url category discount:boolean female_director:boolean --no-test-framework
```

This command will:

- Generate a migration for creating a `movies` table with the specified attributes
- Generate a `Movie` model file
- Generate a `MoviesController` controller file
- Add `resources :movies` to the `routes.rb` file

It's a powerful command, so make sure to use it sparingly! You should only use
`rails g resource` if you truly need all of that code generated.

## Running the API

To get some sample data into our application, we've provided a `seeds.rb` file
in the root directory of this repo. Copy the contents of this file into your
`db/seeds.rb` file. Then, to set up and seed the database, run:

```sh
rails db:migrate db:seed
```

Let's update our `routes.rb` file to set up just the one route our frontend
needs, for the time being:

```rb
# config/routes.rb
resources :movies, only: [:index]
```

We can also add the index action to our controller:

```rb
def index
  movies = Movie.all
  render json: movies
end
```

With that code in place, run `rails s` to start the server, and visit
`http://localhost:3000/movies` in the browser to see our movie data. Success!

## Conclusion

When creating a new Rails API project from scratch, you can use the `--api` flag
to have Rails optimize your project for building a web API.

We also saw how to use the `resource` generator, which can help quickly set
up the code we need to create RESTful routes and CRUD functionality for one
single resource.

## Resources

- [The Rails Command Line](https://guides.rubyonrails.org/command_line.html)

[--minimal]: https://bigbinary.com/blog/rails-6-1-adds-minimal-option-support
