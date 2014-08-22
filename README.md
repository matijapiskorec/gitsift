# gitsift

**gitsift** is a visualization of GitHub repositories using [D3](http://d3js.org/), [Crossfilter](http://square.github.io/crossfilter/) and [Fuse](http://kiro.me/projects/fuse.html). We admit it, code and design is blatantly copied from Mike Bostock's excellent [Crossfilter's example](http://square.github.io/crossfilter/). We were interested in leveraging this visualization on GitHub's repositories dataset, and to provide few additional features that help *"to go through (something) very carefully in order to find something useful or valuable"* (definition of *"sift"* from [Merriam-Webster](http://www.merriam-webster.com/dictionary/sift)). You can also look at it as a showoff of how GitHub's [Explore](https://github.com/explore) page could look like.

To obtain data on repositories run following query on [Google BigQuery](https://developers.google.com/bigquery/):

```sql
SELECT repository_url, MAX(repository_forks) as forks, MAX(repository_size) as repo_size, MAX(repository_open_issues) as issues, MAX(repository_watchers) as watchers, repository_language, repository_created_at as date
FROM [githubarchive:github.timeline]
WHERE
    PARSE_UTC_USEC(created_at) >= PARSE_UTC_USEC("2014-07-01 00:00:00") AND
    PARSE_UTC_USEC(created_at) < PARSE_UTC_USEC("2014-08-20 00:00:00")
GROUP BY repository_url, repository_language, repository_created_at
ORDER BY forks DESC
```

If you don't have a premium account there is a limit on the number of records you can download. In that case use a `LIMIT` or `HAVING` statement, download data in parts and merge it manually. In our case we downloaded data on 119K repositories that have at least 5 or more forks.

For local testing you can access the visualization on [localhost:8000](http://localhost:8000) after running Python's built-in server:

```
python -m SimpleHTTPServer
```

This visualization is also [live](http://matijapiskorec.github.io/gitsift/) on [GitHub Pages](https://pages.github.com/). We try to manually keep master and gh-pages branches in synch.
