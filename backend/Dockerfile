FROM ruby:3.2.2
WORKDIR /app

RUN apt-get update -qq && apt-get install -y \
  nodejs \
  npm \
  postgresql-client \
  && rm -rf /var/lib/apt/lists/*

COPY Gemfile* ./
RUN bundle install

COPY . .
EXPOSE 3000
CMD ["rails", "server", "-b", "0.0.0.0"]