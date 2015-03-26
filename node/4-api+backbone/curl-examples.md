curl  -u 'my-api-key-goes-here' https://api.orchestrate.io/v0/test-table

curl  -u 'my-api-key-goes-here' -XPOST  -H 'Content-Type:application/json'    -d '{"test":"object"}' https://api.orchestrate.io/v0/test-table/

curl  -u 'my-api-key-goes-here' -XPUT  -H 'Content-Type:application/json'    -d '{"test":"object"}' https://api.orchestrate.io/v0/test-table/somekey 

curl  -u 'my-api-key-goes-here' -XDELETE https://api.orchestrate.io/v0/test-table/somekey
