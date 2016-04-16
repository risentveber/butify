web: rails s
job1: bundle exec rake resque:work PIDFILE=./tmp/pids/resque2.pid QUEUES=send_email
job2: bundle exec rake resque:work PIDFILE=./tmp/pids/resque2.pid QUEUES=send_email