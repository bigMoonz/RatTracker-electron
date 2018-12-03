import * as React from "react";
import { withRatData, RatDataProps } from "src/Lib/Decorators";
import "./BoardView.css";

@withRatData
class BoardView extends React.Component<RatDataProps> {
	selectRescue(rescueId: string, e: any) {
		this.props.store.selectedRescue = rescueId;
	}
	render() {
		let rescueItems = [];
		for (let rescueKey in this.props.store.rescues) {
			let rescue = this.props.store.rescues[rescueKey];
			rescueItems.push(
				<tr
					key={rescue.id}
					className="rescueRow"
					onClick={e => this.selectRescue(rescue.id, e)}
				>
					<td align={"center"}>
						#{rescue.attributes.data.boardIndex}
					</td>
					<td align={"center"}>
						{rescue.attributes.platform.toUpperCase()}
					</td>
					<td>{rescue.attributes.client}</td>
					<td>{rescue.attributes.system}</td>
					<td align={"center"}>
						{rescue.attributes.codeRed ? "✅" : "❌"}
					</td>
					<td align={"center"}>
						{rescue.attributes.status === "open" ? "✅" : "❌"}
					</td>
					<td>
						{rescue.relationships.rats.data &&
							rescue.relationships.rats.data.map((rat: any) => {
								let _rat = this.props.store.rats[rat.id];

								if (!!_rat) {
									return (
										<li key={_rat.id + "-" + rescue.id}>
											{_rat.attributes.name}
										</li>
									);
								}
								return null;
							})}
					</td>
				</tr>
			);
		}

		return (
			<table>
				<thead>
					<tr>
						<th className="caseNumber">Case No.</th>
						<th className="platform">Platform</th>
						<th>Client</th>
						<th>System</th>
						<th className="codeRed">Code Red</th>
						<th className="active">Active</th>
						<th>Assigned Rats</th>
					</tr>
				</thead>
				<tbody className="rescueRows">{rescueItems}</tbody>
			</table>
		);
	}
}

export default BoardView;
