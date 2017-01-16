# React-MDL SelectField

SelectField autocomplete component for [React Material Design Lite](https://github.com/react-mdl/react-mdl)

## Requirements
- React
- React-mdl
- Lodash

## Installation

```
npm install --save react-mdl-select
```

## Usage

```
import { MDLSelectField } from 'react-mdl-select';

render() {
  return() (
    <MDLSelectField
      label="Country"
      value={this.props.country}
      autocomplete
      floatingLabel
      onChange={() => {}}
      items={this.props.countries}
      keyField="code"
      valueField="name"
    />
  );
}
```
