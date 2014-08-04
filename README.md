# gitsift

**gitsift** is a visualization of GitHub public timeline data using D3 and Crossfilter.

Most of the code is blatantly copied from Crossfilter's official [example](http://square.github.io/crossfilter/). Everybody has to start somewhere.

Definition of *sift* from [Merriam-Webster](http://www.merriam-webster.com/dictionary/sift):

> to go through (something) very carefully in order to find something useful or valuable

CSV files are not commited to repo for now. To obtain data for visualization run following query on [Google BigQuery](https://developers.google.com/bigquery/):

```sql
SELECT repository_name, repository_language, actor_attributes_login, repository_forks, created_at, payload_commit_msg
FROM [githubarchive:github.timeline]
WHERE repository_language != ''
AND payload_commit_msg != ''
AND PARSE_UTC_USEC(created_at) > PARSE_UTC_USEC('2014-07-01 00:00:00')
ORDER BY repository_forks DESC
LIMIT 15000
```
