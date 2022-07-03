require 'erb'
require 'rainbow/refinement'
using Rainbow

def config(binding)
  File.read('_config.yml.erb')
      .then { |content| ERB.new(content).result(binding) }
      .then { |result| File.write('_config.yml', result) }
end

@__execute_counter__ = 0
def execute(one_line)
  one_line.gsub!(/\s+/, ' ')
  puts(format(' %<num>02d  %<cmd>s', num: (@__execute_counter__ += 1), cmd: one_line.yellow))
  system(one_line, exception: true)
end

desc 'Serve for development'
task :serve do
  url = ''
  config(binding)
  execute 'bundle exec jekyll serve -l'
end
task default: :serve

namespace :build do
  desc 'Build for production'
  task :production do
    url = 'http://www.cgtic.cn'
    config(binding)
    execute 'bundle exec jekyll build'
  end

  desc 'Build for staging'
  task :staging do
    url = 'https://baiming969696.github.io/work-cgtic-website'
    config(binding)
    execute 'bundle exec jekyll build'
  end
end

desc 'Publish for staging'
task 'publish:staging' => 'build:staging' do
  execute 'git checkout export'
  execute 'rm -rf docs/'
  execute 'mv _site/ docs/'
  execute 'git add -A'
  execute "git commit -m '#{Time.now.to_s[0..18]}'"
  execute <<~END_OF_CMD
    GIT_SSH_COMMAND="ssh -i ~/.ssh/id_cgtic-website -o IdentitiesOnly=yes"
    git push -f git@github.com:baiming969696/work-cgtic-website.git export:master
  END_OF_CMD
  execute 'git checkout master'
end
