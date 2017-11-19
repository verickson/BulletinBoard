//database name
create database bulletinboard;

//table messages
create table messages(
  id serial primary key,
  title text,
  body text
);


insert into messages(title, body) values('title of post', 'this is the body content');
