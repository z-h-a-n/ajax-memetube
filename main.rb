require 'sinatra'
require 'sinatra/contrib/all' if development?
require 'pg'
require 'pry-byebug'


get '/' do
  erb :index
end


get '/videos' do
  sql = "select * from videos"
  @videos = run_sql(sql)
  # checking if it is an ajax request?
  if request.xhr?
    # convert the pg object into an array, convert the array to json to send back as response
    json @videos.to_a

  else
    erb :index
  end
end

post '/videos' do
  title = params[:title]
  description = params[:description]
  url = params[:url]
  genre = params[:genre]
  sql = "INSERT INTO videos (title, description, url, genre) values ('#{title}', '#{description}', '#{url}', '#{genre}') returning *"
  @video = run_sql(sql).first

  if request.xhr?
    json @video
  else
    redirect_to '/videos'
  end
end

private
def run_sql(sql)
  conn = PG.connect(dbname: 'memetube', host: 'localhost')
  begin
    result = conn.exec(sql)
  ensure
    conn.close
  end
  result
end













