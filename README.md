# Postgres Idle Connections Reaper

Kills `idle`, `idle in transaction`, `idle in transaction (aborted)`, `disabled` connections in RDS that have been idle for too long.

### Deployment

1. Configure an `.env` file according to `.env.template`
2. Place on an EC2 instances or long running container that has access to the Postgres DB in question.
3. Setup cron with
   `(crontab -l ; echo "*/10 * * * * cd rds-reap-idle-connections/ && node index.js") | crontab`

replace rds-reap-idle-connections/index.js with path to deployment if needed.
