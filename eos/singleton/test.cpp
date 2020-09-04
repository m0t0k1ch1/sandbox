#include <eosio/eosio.hpp>
#include <eosio/singleton.hpp>

using namespace eosio;

class [[eosio::contract]] test : public contract
{
  public:

    using contract::contract;

    [[eosio::action]]
    void get()
    {
      check(config.exists(), "config does not exist");
      const auto& conf = config.get();
      print_f("version: %", conf.version);
    }

    [[eosio::action]]
    void set(
      const std::string& version
    ) {
      auto conf = config.get_or_create(get_self());
      conf.version = version;
      config.set(conf, get_self());
    }

    [[eosio::action]]
    void remove()
    {
      config.remove();
    }

    struct [[eosio::table]] config
    {
      std::string version;
    };
    typedef singleton<name("config"), config> config_singleton;

  private:

    config_singleton config = { get_self(), get_self().value };
};
