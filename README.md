# Ansible Role: pacemaker

[![Ansible Galaxy](http://img.shields.io/badge/ansible--galaxy-sshd-blue.svg?style=popout-square)](https://galaxy.ansible.com/skriptfabrik/pacemaker) [![Ansible Role](https://img.shields.io/ansible/role/d/59509.svg?style=popout-square)](https://galaxy.ansible.com/skriptfabrik/pacemaker)

## Description

This role provides the pacemaker/corosync services to set up and configure a HA cluster.

## Installation

```bash
ansible-galaxy install skriptfabrik.pacemaker
```

## Requirements

None

## Role Variables

| Variable                      | Type                  | Default                          | Comments                                 |
|-------------------------------|-----------------------|----------------------------------|------------------------------------------|
| corosync_authkey_file         | string                | `/etc/corosync/authkey`          | corosync auth key file path              |
| corosync_bindnet_interface    | string                |                                  | interface used for cluster communication |
| corosync_cluster_name         | string                | `corosync-cluster`               | corosync cluster name                    |
| corosync_config_file          | string                | `/etc/corosync/corosync.conf`    | corosync config file path                |
| corosync_log_file             | string                | `/var/log/corosync/corosync.log` | corosync log file path                   |
| pacemaker_cluster_group       | string                |                                  | clusters ansible host group name         |
| pacemaker_cluster_properties  | list of dictionaries  |                                  | cluster settings definition              |
| pacemaker_cluster_resources   | list of dictionaries  |                                  | cluster resources definition             |
| pacemaker_cluster_constraints | list of dictionaries  |                                  | cluster constraints definition           |

### `pacemaker_cluster_properties` definition dictionary

| Key   | Type    | Default   | Comments                                                                  |
|-------|---------|-----------|---------------------------------------------------------------------------|
| name  | string  |           | Cluster property name                                                     |
| state | string  | `present` | `present`: create or update the resource<br>`absent`: remove the resource |
| value | mixed   | `null`    | Cluster property value (set to default if value is not defined)           |

### `pacemaker_cluster_resources` definition dictionary

| Key           | Type                 | Default   | Comments                                                                                     |
|---------------|----------------------|-----------|----------------------------------------------------------------------------------------------|
| resource_id   | string               |           | Unique cluster resource name                                                                 |
| state         | string               | `present` | `present`: create or update the resource<br>`absent`: remove the resource                    |
| provider      | string               |           | Name of the resource provider (use `pcs resource providers` to list all available providers) |
| options       | list of strings      | `[]`      | Optional list of the provider options                                                        |
| operations    | list of dictionaries | `[]`      | Optional list resource operations                                                            |
| stickiness    | integer              | `0`       | Optional resource stickiness value                                                           |
| test_command  | string               | `null`    | Optional command to test a service resource configuration                                    |

#### `operations` definition dictionary

| Key          | Type                 | Default   | Comments                                                                  |
|--------------|----------------------|-----------|---------------------------------------------------------------------------|
| name         | string               |           | Operation name (e.g. `start`, `stop`, `monitor`)                          |
| state        | string               | `present` | `present`: create or update the resource<br>`absent`: remove the resource |
| options      | list of strings      | `[]`      | Optional list of the operation options                                    |

### `pacemaker_cluster_constraints` definition dictionary

| Key        | Type        | Default | Comments                                              |
|------------|-------------|---------|-------------------------------------------------------|
| type       | string      |         | Constraint type<br>one of `colocation` or `order`     |
| colocation | dictionary  |         | Colocation constraint settings for `type=colocation`  |
| order      | dictionary  |         | Order constraint settings for `type=order`            |

#### `colocation` constraint definition dictionary

| Key                | Type           | Default     | Comments                                                                      |
|--------------------|----------------|-------------|-------------------------------------------------------------------------------|
| state              | string         | `present`   | `present`: create or update the constraint<br>`absent`: remove the constraint |
| source_resource_id | string         |             | Constraint source resource id                                                 |
| target_resource_id | string         |             | Constraint target resource id                                                 |
| score              | integer/string | `INFINITY`  | Constraint score                                                              |

#### `order` constraint definition dictionary

| Key                    | Type             | Default | Comments                                              |
|------------------------|------------------|---------|-------------------------------------------------------|
| first_resource         | string           |         | ID of the first resource                              |
| first_resource_action  | string           |         | Action of the first resource (e.g. ´start`)           |
| second_resource        | string           |         | ID of the second resource                             |
| second_resource_action | string           |         | Optional action of the second resource (e.g. ´start`) |
| options                | list of strings  | `[]`    | Optional list of the order options                    |

## Dependencies

None

## Example Playbook

```yaml
- hosts: all
  roles:
    - skriptfabrik.pacemaker
```

## Author

- [Frank Giesecke](https://github.com/FrankGiesecke)

## License

This project is under the MIT License.

## Copyright

(c) 2022, skriptfabrik GmbH
