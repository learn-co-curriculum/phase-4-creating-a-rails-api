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
for our `dvd-shop`. Use `cd ..` to navigate out of the lab directory, and run:

```console
$ rails new dvd-shop --api --minimal
```

- `--api`: this flag will create our new application with some additional
  API-specific configuration, and will skip the code for generating `.erb` files
  with ActionView.
- `--minimal`: this flag skips a lot of additional Rails features that we
  won't use in our API, such as code for sending emails and processing images.
  Read more about the [`--minimal` flag][--minimal].

> The reason we ask you to `cd` out of the lab directory is because when you
> generate a new Rails project, it will automatically create a new Git
> repository for your Rails project. Since the lab directory is already a Git
> repository, it's better to create this new project in its own directory, so
> you don't end up with nested Git repositories.

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

| Column Name     | Data Type |
| --------------- | --------- |
| title           | string    |
| year            | integer   |
| length          | integer   |
| director        | string    |
| description     | string    |
| poster_url      | string    |
| category        | string    |
| discount        | boolean   |
| female_director | boolean   |

We could create the route, model, controller, and migration individually, but
since this kind of operation is pretty common for a Rails developer, there's a
handy generator that will set up all the code we need: `rails g resource`.

Navigate into the `dvd-shop` directory and run this code in your terminal:

```console
$ rails g resource Movie title year:integer length:integer director description poster_url category discount:boolean female_director:boolean --no-test-framework
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

```console
$ rails db:migrate db:seed
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

## Check For Understanding

Before you move on, make sure you can answer the following question:

1. What files are generated when running `rails g resource ResourceName`?

## Resources

- [The Rails Command Line](https://guides.rubyonrails.org/command_line.html)

[--minimal]: https://bigbinary.com/blog/rails-6-1-adds-minimal-option-support
