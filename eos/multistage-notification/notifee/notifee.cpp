#include <eosio/eosio.hpp>

using namespace eosio;

class [[eosio::contract]] notifee : public contract
{
  public:

    using contract::contract;

    [[eosio::action]]
    void ping()
    {
      print_f("[%] pong\n", get_self());
    }

    void onnotify(
      const name& target,
      const name& next_notifier,
      const name& next_target
    ) {
      print_f("[%] first_receiver: %\n", get_self(), get_first_receiver());

      if (next_notifier.value != 0) {
        action(
          permission_level{ get_self(), name("active") },
          next_notifier,
          name("notify"),
          std::make_tuple(next_target, name(""), name(""))
        ).send();
      }
    }
};

extern "C"
{
  void apply(uint64_t receiver, uint64_t code, uint64_t action)
  {
    if (action == name("notify").value) {
      execute_action(name(receiver), name(code), &notifee::onnotify);
    }
  }
};
