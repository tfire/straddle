## Some Math Notes

An example of a stake with no timelock. This would still create a Lock object but the tier would be 0 and it wouldn't be timelocked.

There is a benefit of simplicity to doing it this way. By treating stakes w/o lock and stakes w/ lock the same, a tier-0 lock can account for the primary reward (eg. 50% in first pass of tokenomics outline) and a tier-n lock can account for the complementary remainder.

If a lock expires, the user needs to continue being rewarded for their unlocked-stake. And this handles that.

```
reward = 
Lock-0.amt_staked * ∑ 1-n (as K) [ Dist-K.amt_reward / Dist-K.total_staked ]
for each Distribution-K where
Dist-K.timestamp >= Lock-0.start_time && Dist-K <= Lock-0.end_time
```

## Some Architectural Notes

```
uint constant YEAR_3000 = 32503680000;

struct Distribution {
  uint time;
  uint amt_reward;
  uint total_staked;
}
Distribution[] distributions;

struct Lock {
  uint start_time;
  uint end_time;
  uint amt_staked;
  uint tier; // 0 - 4
}
mapping(address => Lock[]) user_locks;

function deposit(amount, lock_tier){
  // insert deposit functionality

  lock(amount, 0) // create a lock of tier 0 to reflect the deposit itself
  if lock_tier > 0:
    lock(amount, lock_tier) // create timelock 
}

function lock(amount, lock_tier){
  user = msg.sender
  end_time = block.timestamp + (lock_tier * 3 months)
  if lock_tier == 0:
     end_time = YEAR_3000;
  lock = Lock(timestamp.now, end_time, amount, lock_tier)
  user_locks[user].push(lock)
}

function calculateRewards(address user) {
  uint total_reward = 0;
  for lock in user_locks[user]:
    uint distributions_value = 0;
    for dist in distributions:
      if dist.time >= lock.start_time and dist.time <= lock.end_time:
        distributions_value += amt_reward / total_staked;

    total_reward += lock.amt_staked * distributions_value;        

  return total_reward;
}

```


