What follows is a summary of instructions from:
http://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up

---

First, download and install the Heroku toolbelt:
http://devcenter.heroku.com/toolbelt-downloads/osx

Then in your terminal:

	heroku login
	(heroku keys)

Set up a sample repo:
	cd [somewhere above new repo]
	git clone https://github.com/heroku/node-js-getting-started.git
	cd node-js-getting-started/
	sudo npm install
	git config --list

Check the apps listed in Heroku dashboard...

Link repo to a new heroku app:
	heroku create
	git config --list
	heroku status
	heroku apps --help
	heroku apps
	heroku apps:rename <myname>-helloworld
	heroku apps

Send to heroku:
	git push heroku master

Test it on heroku:
	heroku open

Destroy the remote app:
	heroku apps:destroy -app <myname>-helloworld
	git config --list

Test it again (visit old URL)
	heroku open
	heroku apps
	git config --list

In Dashboard, make a temporary app (<myname>-helloworld).

Relink repo to new heroku app:
	heroku git:remote -a <myname>-helloworld
	heroku open
	git config --list


Deploy again:
	git push heroku master
	heroku open
	

Follow those steps when you're ready to deploy your current project repo...
	cd <project>
	<create or copy Procfile>
	git add Procfile
	git commit...
	heroku git:remote -a <capstone-app>
	git push heroku master

